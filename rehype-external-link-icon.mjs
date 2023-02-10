export default {
    type: 'element',
    tagName: 'svg',
    properties: {
        viewBox: '0 0 17 17',
        fill: 'none',
        className: 'not-prose w-6 h-6'
    },
    children: [{
        type: 'element',
        tagName: 'path',
        properties: {
            stroke: '#ffffff',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': 2,
            d: 'M 7,4.0001 H 2 a 1,1 0 0 0 -1,1 v 10 a 1,1 0 0 0 1,1 h 10 a 1,1 0 0 0 1,-1 v -5 m -6,0 7.5,-7.5 m -4.5,-1.5 h 6 v 6',
        },
        children: []
    }]
}