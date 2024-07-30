//(function() {
//	function changeBranchesHref() {
//		//currentLoc = document.location.href.substring(18);
//		//anchor = document.querySelector(`a[href='${currentLoc}/branches']`);
//		//anchor.href = `${anchor.href}/all`;
//		//alert("test");
//		console.log("test");
//	}
//
//	changeBranchesHref();
//})();

//currentLoc = document.location.href.substring(18)
//anchor = document.querySelector(`a[href='${currentLoc}/branches']`)
//anchor.href = `${anchor.href}/all`
//
//console.log("changed branches link to /all");


//window.onload = function() {
////document.addEventListener('DOMContentLoaded', function() {
//
//  // Your code here
//
//	console.log("Page fully loaded, including all resources.");
//	
//	setTimeout(1000);
//	console.log('First');
//	setTimeout(1000);
//	console.log('Second');
//
//	currentLoc = document.location.href.substring(18);
//	console.log(currentLoc);
//	branchesButton = document.querySelector(`a[href='${currentLoc}/branches']`);
//	console.log(branchesButton);
//	branchesButton.href = `${branchesButton.href}/all`;
//	console.log(branchesButton);
//
//};

//window.onload = function() {
//	currentLoc = document.location.href.substring(18);
//	branchesButton = document.querySelector(`a[href='${currentLoc}/branches']`);
//	branchesButton.href = `${branchesButton.href}/all`;
//};







/*const*/ sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

/*const*/ changeBranchesHref = async () => {
	await sleep(100)
	console.log("page loaded")

	currentLoc = document.location.href.substring(18)
	console.log(currentLoc)
	nodeList = document.querySelectorAll(`a[href='${currentLoc}/branches']`)
	console.log(nodeList)
	
	nodeList.forEach(anchor => {
		anchor.href = `${anchor.href}/all`
		console.log(anchor.href)
	});

	console.log(window)
}

changeBranchesHref()
//changeBranchesHref()




// Execute script in the current tab




//const changeBranchesHref = async () => {
//	await sleep(3000)
//	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
//	await chrome.scripting.executeScript({
//	target: { tabId: tab.id },
//		//func: (items) => {
//		//  Object.keys(items).forEach((key) => {
//		//    localStorage.setItem(key, items[key])
//		//  })
//		//},
//		//args: [items] // pass any parameters to function
//	func: () => {
//		console.log(window)
//	},
//	args: [] // pass any parameters to function
//	})
//}
//
//changeBranchesHref()
