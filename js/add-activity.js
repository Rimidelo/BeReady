import { addActivity } from './activities.js';

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('file-add-icon').addEventListener('click', function () {
        document.getElementById('upload').click();
    });
    document.querySelector('label[for="upload"]').addEventListener('click', function () {
        document.getElementById('upload').click();
    });

});

