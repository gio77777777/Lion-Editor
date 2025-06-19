function removeBackground() {
  const fileInput = document.getElementById('upload');
  const originalImage = document.getElementById('original');
  const resultImage = document.getElementById('result');
  const downloadBtn = document.getElementById('download-btn');

  if (fileInput.files.length === 0) {
    alert("Please upload an image!");
    return;
  }

  const file = fileInput.files[0];
  originalImage.src = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "1kRC3a6ATWwWPdnco41TrdNU" // Replace with your real API key
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) throw new Error("Failed to remove background.");
      return response.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      resultImage.src = url;
      downloadBtn.href = url;
      downloadBtn.style.display = "inline-block";
    })
    .catch(error => {
      alert("Error: " + error.message);
      console.error(error);
    });
}
