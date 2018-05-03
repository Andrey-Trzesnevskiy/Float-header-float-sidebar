class TransferService {
	constructor () {
		this.data = {}
	}
	setData (params) {
		this.data[params.name] = params.data;
	}
	getData (name) {
		return this.data[name];
	}
}
window.onload = function () {
	let header = document.querySelector ('header');
	let headerHeight = header.clientHeight;
	let content = document.querySelector('.content');
	let sidebar = document.querySelector('.sidebar');
	let sidebarHeight = sidebar.clientHeight;
	sidebar.style.top = headerHeight + 'px';
	let mainWrap = document.querySelector('main');
	mainWrap.style.marginTop = headerHeight+'px'
	let startScroll = 0;
	let startScrollHeader = 0;
	let transferServiceSidebar = new TransferService();
	let transferServiceHeader = new TransferService();
	window.onscroll = () => {
	  scrollPageForSidebar();
	  scrollPageForHeader();
	};
	let abs = true;
	let absHeader = true;
	function scrollPageForSidebar () {
		let scrolled = window.pageYOffset || document.documentElement.scrollTop;
		console.log(scrolled);
		if (scrolled > startScroll) {
			//down
			if (scrolled < sidebarHeight+headerHeight) {
				let pos = transferServiceSidebar.getData('posFromUp') || headerHeight;
				sidebar.style.top = pos + 'px';
				transferServiceSidebar.setData({name: 'posFromDown', data: headerHeight});
				abs = false;
			}
			else if (abs) {
				let pos = transferServiceSidebar.getData('posFromUp')
				sidebar.style.top = pos +'px';
				transferServiceSidebar.setData({name: 'posFromDown', data: scrolled-sidebarHeight});
			}
			else {
				transferServiceSidebar.setData({name: 'posFromDown', data: scrolled-sidebarHeight});
			}
		    sidebar.style.position = 'absolute';
		    transferServiceSidebar.setData({name: 'scrollFromDown', data: scrolled});
		}
		else if (scrolled < startScroll) {
			//up
			let scrollForSidebar = transferServiceSidebar.getData('scrollFromDown');
			if (scrolled < headerHeight + sidebarHeight && scrollForSidebar < headerHeight + sidebarHeight) {
				sidebar.style.position = 'absolute';
				sidebar.style.top = headerHeight + 'px';
				transferServiceSidebar.setData({name: 'posFromUp', data: headerHeight});
				abs = true;
			}
			else if (scrolled > scrollForSidebar-sidebarHeight-headerHeight) {
				let pos = transferServiceSidebar.getData('posFromDown');
				sidebar.style.position = 'absolute';
				sidebar.style.top = pos + 'px';
				transferServiceSidebar.setData({name: 'posFromUp', data: pos});
				abs = true;
			}
			else if (scrolled < scrollForSidebar-sidebarHeight-headerHeight) {
				sidebar.style.position = 'fixed';
				sidebar.style.top = headerHeight + 'px';
				transferServiceSidebar.setData({name: 'posFromUp', data: scrolled+headerHeight});
				abs = true;
			}	
		 transferServiceSidebar.setData({name: 'scrollFromUp', data: scrolled});
		}    
		startScroll = scrolled;
	}
	function scrollPageForHeader () {
		let scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if (scrolled > startScrollHeader) {
			//down
		 	if (scrolled < headerHeight) {
				let pos = transferServiceHeader.getData('posFromUp') || 0;
				header.style.top = pos + 'px';
				transferServiceHeader.setData({name: 'posFromDown', data: 0});
				absHeader = false;
			}
			else if (absHeader) {
				let pos = transferServiceHeader.getData('posFromUp')
				header.style.top = pos +'px';
				transferServiceHeader.setData({name: 'posFromDown', data: scrolled-headerHeight});
			}
			else {
				transferServiceHeader.setData({name: 'posFromDown', data: scrolled-headerHeight});
			}
		    header.style.position = 'absolute';
		    transferServiceHeader.setData({name: 'scrollFromDown', data: scrolled});
		}
		else if (scrolled < startScrollHeader) {
			// up
		let scrollForHeader = transferServiceHeader.getData('scrollFromDown');
			if (scrolled < headerHeight  && scrollForHeader < headerHeight) {
				header.style.position = 'absolute';
				header.style.top = 0;
				transferServiceHeader.setData({name: 'posFromUp', data: 0});
				absHeader = true;
			}
			else if (scrolled > scrollForHeader-headerHeight) {
				let pos = transferServiceHeader.getData('posFromDown');
				header.style.position = 'absolute';
				header.style.top = pos + 'px';
				transferServiceHeader.setData({name: 'posFromUp', data: pos});
				absHeader = true;
			}
			else if (scrolled < scrollForHeader-headerHeight) {
				header.style.position = 'fixed';
				header.style.top = 0;
				transferServiceHeader.setData({name: 'posFromUp', data: scrolled});
				absHeader = true;
			}	
		 transferServiceHeader.setData({name: 'scrollFromUp', data: scrolled});
		}
		startScrollHeader = scrolled;
	}
}