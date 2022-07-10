const publicVapidKey =
	"BKlWBKsQm6aQ9cU9BD5D1UH4PcOE60mOAP1k_XYaOv5OwuTbsv-ioRV0CgVFEH9EqR0jnxyZwXOP1_KVELzRtos";

const urlBase64ToUit8Array = (base64String) => {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");
	const rowData = window.atob(base64);
	const outputArray = new Uint8Array(rowData.length);
	for (let i = 0; i < rowData.length; ++i) {
		outputArray[i] = rowData.charCodeAt(i);
	}
	return outputArray;
};

const send = async () => {
	console.log("Registering service worker....");
	const register = await navigator.serviceWorker.register("/worker.js", {
		scope: "/",
	});
	console.log("Service worker Registered...");
	console.log("Registering Push...");

	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUit8Array(publicVapidKey),
	});
	console.log("Push Registered...");

	console.log("Sending Push...");

	await fetch('https://ioclinternship.herokuapp.com/subscribe', {
		method: "POST",
		body: JSON.stringify(subscription),
		headers: {
			"content-type": "application/json",
		},
	});

	console.log("Push Sent...");
};

if ("serviceWorker" in navigator) {
	send().catch((err) => console.log(err));
}
