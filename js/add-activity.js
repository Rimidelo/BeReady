const addFileIconElement = document.getElementById("file-add-icon");
const uploadElement = document.getElementById("upload");

addFileIconElement.onclick = () => {
  uploadElement.click();
};

document
  .querySelector('label[for="upload"]')
  .addEventListener("click", function () {
    document.getElementById("upload").click();
  });

const addToArchiveButton = document.getElementById("add-activity-arcive");
addToArchiveButton.onclick = () => {
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const description = document.getElementById("description").value;
  const target = document.getElementById("target").value;
  const unit = document.getElementById("unit").value;
  const isGroupActivity = document.getElementById("groupActivity").checked;
  const upload = document.getElementById("upload").files[0];

  const formData = {
    name: name,
    type: type,
    description: description,
    target: {
      value: target,
      unit: unit,
    },
    frameworkType: isGroupActivity ? COLLECTIVE : PERSONAL,
  };

  addActivity(formData);
  console.log("Add to Archive:", formData);
};
