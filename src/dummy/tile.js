const tileData = [
    {
        img: '/static/images/grid-list/breakfast.jpg',
        title: 'Breakfast',
        author: 'jill111',
        featured: true,
    },
    {
        img: '/static/images/grid-list/burgers.jpg',
        title: 'Tasty burger',
        author: 'director90',
    },
    {
        img: '/static/images/grid-list/camera.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: '/static/images/grid-list/morning.jpg',
        title: 'Morning',
        author: 'fancycrave1',
        featured: true,
    },
    {
        img: '/static/images/grid-list/hats.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: '/static/images/grid-list/honey.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: '/static/images/grid-list/vegetables.jpg',
        title: 'Vegetables',
        author: 'jill111',
    },
    {
        img: '/static/images/grid-list/plant.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
    {
        img: '/static/images/grid-list/mushroom.jpg',
        title: 'Mushrooms',
        author: 'PublicDomainPictures',
    },
];

tileData.map(function(tile){
    tile.img= 'https://material-ui.com/'+tile.img;
});
export default tileData;