const uploadContainer = document.querySelector('.upload-container')
const imagePreview = document.querySelector('.upload-container img')
const imageInput = document.querySelector('.upload-container input')

uploadContainer.addEventListener('click', () => imageInput.click())

const loadImage = e => {
	const image = e.target.files[0]
	if (!image) return
	imagePreview.src = URL.createObjectURL(image)
	imagePreview.addEventListener('load', () =>
		document.querySelector('.wrapper').classList.add('active')
	)
}

imageInput.addEventListener('change', loadImage)
