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

import selectUploadForm from './selectors';

import Img from '../../components/Img/Img';
import APIClient from '../../utils/apiUtils';

import styles from './styles.css';

export class UploadForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
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
      processingImage: true
    }, () => {
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
            processingImage: false
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
    });
  };

  clearImage = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    this.setState({
      files: [],
      img: undefined,
      imgPreviewUrl: undefined
    });
  };

  handleUpload = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    let data = new FormData();
    data.append('photo', this.state.img);
    let responsePromise = APIClient.post('uploadImage', data);
    responsePromise.then((response) => {
      console.log(response.data);
      alert(response.data['upload status'])
    }, (err) => {
      alert(err.message);
    });
  };

  render() {
    let self = this;
    let body = self.state.imgPreviewUrl ? (
      <div className={styles.previewImageWrapper}>
        <Element name="UploadImg" />
        <Img className={styles.previewImage}
             lazyLoad={true}
             spinnerWrapperStyle={{width: '100%', height: 300}}
             src={self.state.imgPreviewUrl} />
        <button type="submit" className={styles.submitButton} onClick={(evt) => self.handleUpload(evt)}>
          Upload Image
        </button>
        <p className={styles.selectAnotherText}>
          Or select another image
          <a onClick={this.clearImage} className={styles.clearImage}>
            by clicking here.
          </a>
        </p>
      </div>
    ) : (
      <Dropzone ref={(node) => {this.dropzone = node}}
                multiple={false}
                onDrop={this.onDrop}
                accept="image/*"
                className={styles.dropZone}>
        <p className={styles.dropZoneText}>
          Click to Browse Your Computer<br/>
          <b>or</b><br/>
          Drag Picture Here
        </p>
      </Dropzone>
    );
    return (
      <div className={styles.uploadFormWrapper}>
        <Helmet
          title="UploadForm"
          meta={[
            { name: 'description', content: 'Description of UploadForm' },
          ]}
        />
        <form onSubmit={(evt) => self.handleUpload(evt)} className={styles.uploadForm}>
          <h1 className={styles.uploadFormHeader}>
            Upload an Image
          </h1>
          <p className={styles.uploadFormSubHeader}>
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
