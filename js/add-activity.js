

document.addEventListener('DOMContentLoaded', function () {
    // Existing file upload click handlers
    document.getElementById('file-add-icon').addEventListener('click', function () {
        document.getElementById('upload').click();
    });
    document.querySelector('label[for="upload"]').addEventListener('click', function () {
        document.getElementById('upload').click();
    });


    const addToArchiveButton = document.getElementById('add-activity-arcive');
    addToArchiveButton.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const target = document.getElementById('target').value;
        const unit = document.getElementById('unit').value;
        const groupActivity = document.getElementById('groupActivity').checked;
        const upload = document.getElementById('upload').files[0];


        const formData = {
            name: name,
            category: category,
            description: description,
            target: target,
            unit: unit,
            groupActivity: groupActivity,
            upload: upload
        };

        console.log('Add to Archive:', formData);
    });
});
