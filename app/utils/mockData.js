
/* ## Data model ##

Presentation
	id
	title
 	slide[]
 		id
 		title
		subTitle
		bullet[]
            developer 
			text
			link[]
				text
				url

	Controller
*/

var mockPresentationData = {
    id: 1,
    title: "Presentation A",
    slideList: [{
        id: 1,
        title: "Slide A Title",
        subTitle: "Slide A subTitle",
        bulletList: [{
            id: 1,
            text: "Slide A bullet A",
            developer: 'HammadAA',
            linkList: [{
                id: 1,
                text: "Sldie A Bullet A Link A",
                url: "http://google.com/SlideABulletALinkA"
            }]
        }]
    }, {
        id: 2,
        title: "Slide B Title",
        subTitle: "Slide B subTitle",
        bulletList: [{
            id: 1,
            text: "Slide B bullet A",
            developer: 'HammadBA',
            linkList: [{
                id: 1,
                text: "Slide B Bullet A Link A",
                url: "http://google.com/SlideBBulletALinkA"
            }, {
                id: 2,
                text: "Slide B Bullet A Link B",
                url: "http://google.com/SlideBBulletALinkB"
            }]
        }, {
            id: 2,
            text: "Slide B bullet B",
            developer: 'HammadBB',
            linkList: [{
                id: 1,
                text: "Slide B Bullet B Link A",
                url: "http://google.com/SlideBBulletBLinkA"
            }]
        }]
    }]
}

exports.mockPresentationData = mockPresentationData;