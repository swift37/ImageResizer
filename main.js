const uploadContainer = document.querySelector('.upload-container')
const imagePreview = document.querySelector('.upload-container img')
const imageInput = document.querySelector('.upload-container input')
const widthInput = document.getElementById('width')
const heightInput = document.getElementById('height')
const ratioCheck = document.getElementById('ratio')

uploadContainer.addEventListener('click', () => imageInput.click())

let originalImgRatio

const loadImage = e => {
	const image = e.target.files[0]
	if (!image) return
	imagePreview.src = URL.createObjectURL(image)
	imagePreview.addEventListener('load', () => {
		document.querySelector('.wrapper').classList.add('active')
		widthInput.value = imagePreview.naturalWidth
		heightInput.value = imagePreview.naturalHeight
		originalImgRatio = imagePreview.naturalWidth / imagePreview.naturalHeight
	})
}

widthInput.addEventListener('keyup', () => {
	const height = ratioCheck.checked
		? widthInput.value / originalImgRatio
		: heightInput.value
	heightInput.value = Math.floor(height)
})

heightInput.addEventListener('keyup', () => {
	const width = ratioCheck.checked
		? heightInput.value / originalImgRatio
		: widthInput.value
	widthInput.value = Math.floor(width)
})

imageInput.addEventListener('change', loadImage)
