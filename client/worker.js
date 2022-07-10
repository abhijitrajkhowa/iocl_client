self.addEventListener("push", (e) => {
	const data = e.data.json();
	console.log("Push Recieved...");
	self.registration.showNotification(data.title, {
		body: data.body,
		icon: "https://res.cloudinary.com/freshlypick/image/upload/v1657122652/logo/iocl_omlheu.png",
	});
});
