new Vue({
    el: "#root",
    data:{
        title: "Foodigo Restaurant Dashboard",
        orders:[
            {name:"Chris Nwamba", description:"Rice and Ofe-Akwu", address:"Lekki", telephone:"08082092001", open:true},
            {name:"William Imoh", description:"Rice and Chicken", address:"Amuwo", telephone:"08082818700", open:true},
            {name:"Mary-Anne Unoka", description:"Yam and Egg Sauce", address:"Satellite Town", telephone:"08083872501", open:true},
            {name:"Ralph Ugwu", description:"Rice and Salad", address:"Nsukka", telephone:"08082983021", open:true},
            {name:"BLAQLSG Imoh", description:"Cake and Sprite", address:"Ije-Ododo", telephone:"08082869830", open:true}
        ]
    },
    created(){
        var pusher = new Pusher('PusherKey',{
            cluster:'PusherCluster',
            encrypted:true
        })
        var channel = pusher.subscribe('orders')
        channel.bind('customerOrder', (data) => {
            console.log(data)
            this.orders.push(data)
        })
    }
})

methods:{
    // close completed order
    close(orderToClose);{
        if ( confirm('Are you sure you want to close the order?') === true){
            this.orders = this.orders.map(order => {
                if(order.name !== orderToClose.name && order.description !== orderToClose.description){
                    return order;
                }
                const change = Object.assign(order, {open: !order.open})
                return change;
            })
        } 
    }
}