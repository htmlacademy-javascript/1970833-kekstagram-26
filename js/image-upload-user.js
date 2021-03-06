const TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');

const showImageUploadUser = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};

export {showImageUploadUser};
