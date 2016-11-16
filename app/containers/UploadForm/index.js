/*
 *
 * UploadForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Firebase from 'firebase/app'

import selectUploadForm from './selectors';

import styles from './styles.css';

export class UploadForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      img: undefined,
      imgPreviewUrl: undefined
    }
  }

  handleFileSelect = (evt) => {
    let self = this;
    let files = evt.target.files;
    let file = files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      self.setState({
        img: file,
        imgPreviewUrl: reader.result
      })
    };

    reader.readAsDataURL(file);
  };

  handleUpload = (evt) => {
    if(evt && evt.preventDefault) {
      evt.preventDefault();
    }
    // TODO: Handle upload to firebase
  };

  render() {
    let self = this;
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
          <input type="file"
                 name="img"
                 accept="image/*"
                 className={styles.imageSelect}
                 onChange={(evt) => self.handleFileSelect(evt)}
          />
          <img className={styles.previewImage}
               src={self.state.imgPreviewUrl}
          />
          <button type="submit" className={styles.submitButton} onChange={(evt) => self.handleUpload(evt)}>
            Upload
          </button>
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
