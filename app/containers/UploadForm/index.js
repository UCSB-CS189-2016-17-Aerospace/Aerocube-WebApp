/*
 *
 * UploadForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone';
const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scroll = Scroll.scroller;
import firebase from 'firebase';

import selectUploadForm from './selectors';

import Img from 'components/Img';
import Alert from 'components/Alert';
import APIClient from 'utils/apiUtils';
import FirebaseService from 'services/firebaseService';

import styles from './styles.css';

export class UploadForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alertHeader: '',
      alertMessage: '',
      alertType: Alert.getInfoAlertType(),
      processingImage: false,
      files: [],
      img: undefined,
      imgPreviewUrl: undefined
    };
    this.dropzone = undefined;
  }

  onDrop = (acceptedFiles) => {
    let self = this;
    self.setState({
      processingImage: true,
      alertHeader: 'Please Wait',
      alertMessage: 'Your image is being processed',
      alertType: Alert.getInfoAlertType(),
      showAlert: true
    });
    // Set image to be "processing". Note onDrop isn't called by the DropZone until
    // much of the processing has already been done.
    if(acceptedFiles && acceptedFiles.length == 1) {
      let reader = new FileReader();
      reader.onloadend = () => {
        // Called once the img is loaded in for preview by the FileReader
        self.setState({
          files: acceptedFiles,
          img: acceptedFiles[0],
          imgPreviewUrl: reader.result,
          processingImage: false,
          alertHeader: 'Image Processed',
          alertMessage: 'Please check the preview to make sure you selected the correct image',
          alertType: Alert.getInfoAlertType(),
          showAlert: true
        }, () => { // Scroll to location once processed
          scroll.scrollTo('UploadImg', {
            duration: 600,
            delay: 200,
            smooth: true,
            offset: -75,
            isDynamic: true
          });
        })
      };
      // Starts the process of reading the file
      reader.readAsDataURL(acceptedFiles[0]);
    } else {
      // TODO: Handle error case (Should only occur if file rejected, due to DropZone prop multiple=false)
    }
  };

  clearImage = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    this.setState({
      files: [],
      img: undefined,
      imgPreviewUrl: undefined,
      alertHeader: 'Cleared',
      alertMessage: 'You may now select another image',
      alertType: Alert.getInfoAlertType(),
      showAlert: true
    });
  };

  handleUpload = (evt) => {
    let self = this;
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    self.setState({
      alertHeader: 'Please Wait',
      alertMessage: 'Your image is being uploaded',
      alertType: Alert.getInfoAlertType(),
      showAlert: true
    }, () => {
      let newImageRef = FirebaseService.getStorage().ref().child(`uploads/${Date.now()}`);
      let uploadTask = newImageRef.put(this.state.img, { contentType: 'image/jpeg' });
      let observer = {
        next: (snapshot) => {
          let alertMessage = '';
          switch(snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              alertMessage += 'Upload paused, ';
              break;
            case firebase.storage.TaskState.RUNNING:
              alertMessage += 'Your image is uploading, ';
              break;
            default:
              alertMessage += 'Your upload is ';
          }
          let progress = Math.trunc((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          alertMessage += `${progress}% complete.`;
          self.setState({
            alertHeader: 'Uploading',
            alertMessage: alertMessage,
            alertType: Alert.getInfoAlertType(),
            showAlert: true
          })
        },
        error: (error) => {
          // Handle errors
          self.setState({
            alertHeader: 'Upload Failed',
            alertMessage: `${self.state.img.name} failed to upload.`,
            alertType: Alert.getErrorAlertType(),
            showAlert: true
          })
        },
        complete: () => {
          // Handle completion
          let downloadURL = uploadTask.snapshot.downloadURL;
          console.log(downloadURL);
          let uploadRef = FirebaseService.getDatabase().ref('uploads');
          let writeThenable = uploadRef.set(downloadURL);
          writeThenable.then(() => {
            self.setState({
              alertHeader: 'Successfully Uploaded',
              alertMessage: `${self.state.img.name} has been successfully uploaded.`,
              alertType: Alert.getSuccessAlertType(),
              showAlert: true
            });
          }).catch((error) => {
            self.setState({
              alertHeader: 'Upload Failed',
              alertMessage: `${self.state.img.name} could not be added to the database.`,
              alertType: Alert.getErrorAlertType(),
              showAlert: true
            })
          });
        }
      };
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, observer);
    });
  };

  render() {
    let self = this;
    let body = self.state.imgPreviewUrl ? (
      <div className='previewImageWrapper'>
        <Element name="UploadImg" />
        <Img className='previewImage'
             lazyLoad={true}
             spinnerWrapperStyle={{width: '100%', height: 300}}
             src={self.state.imgPreviewUrl} />
        <button type="submit" className={['button', 'submitButton'].join(' ')} onClick={(evt) => self.handleUpload(evt)}>
          Upload Image
        </button>
        <p className={'selectAnotherText'}>
          Or select another image
          <a onClick={this.clearImage} className='clearImage'>
            by clicking here.
          </a>
        </p>
      </div>
    ) : (
      <Dropzone ref={(node) => {this.dropzone = node}}
                multiple={false}
                onDrop={this.onDrop}
                accept="image/*"
                className='dropZone'>
        <p className='dropZoneText'>
          Click to Browse Your Computer<br/>
          <b>or</b><br/>
          Drag Picture Here
        </p>
      </Dropzone>
    );
    return (
      <div className='uploadFormWrapper'>
        <Helmet
          title="UploadForm"
          meta={[
            { name: 'description', content: 'Description of UploadForm' },
          ]}
        />
        <Element name="UploadAlert" />
        <Alert show={self.state.showAlert}
               header={self.state.alertHeader}
               message={self.state.alertMessage}
               type={self.state.alertType}
               showHideButton={true} />
        <form onSubmit={(evt) => self.handleUpload(evt)} className='uploadForm'>
          <h1 className='uploadFormHeader'>
            Upload an Image
          </h1>
          <p className='uploadFormSubHeader'>
            It's very simple.
          </p>
          { body }
        </form>
      </div>
    );
  }
}

const mapStateToProps = selectUploadForm();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
