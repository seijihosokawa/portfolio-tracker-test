const App = Vue.createApp({
    data(){
        return {
        }
    }
})

App.component('market-index-box', {
    props: ['name', 'stockSymbol'],
    data(){
        return{
            price: Number,
            dayChange: Number,
            dayPercentChange: Number,
            positive: Boolean,
        }
    },
    template: `<div class="bg-black border-opacity-60 | p-1 border-solid rounded-2xl border-2 | flex justify-around cursor-pointer | hover:border-transparent | transition-colors duration-500" :class="{ 'hover:bg-green-400': positive, 'border-green-400': positive, 'hover:bg-red-600': !positive, 'border-red-600': !positive }"><div class="flex flex-col justify-center"><p class="text-base">{{ name }}</p><p class="text-xs">{{ price.toLocaleString() }}</p><p class="text-xs">{{ dayChange.toLocaleString() }}({{ dayPercentChange }})</p></div></div>`,
    methods:{
        async getIndexPrice(stockSymbol){
            try {
                //var data = await getMarketPrice(stockSymbol);
                this.price = 100;//data["price"]["regularMarketPrice"]["fmt"];
                this.dayChange = -200;//data["price"]["regularMarketChange"]["fmt"];
                this.dayPercentChange = 3;//data["price"]["regularMarketChangePercent"]["fmt"];
                this.positive = (this.dayChange >= 0) ? true : false;
            } catch(error){
                console.log(error);
                return 'error loading';
            }
        }
    },
    created(){
        this.getIndexPrice(this.stockSymbol);
    }
})

App.component('portfolio-info-box', {
    props: ['name'],
    data(){
        return{
            overallReturn: Number,
            dayChange: Number,
            dayPercentChange: Number,
            positive: Boolean,
        }
    },
    template: `<div class="bg-black border-white-600 border-opacity-60 | p-1 border-solid rounded-2xl border-2 | cursor-pointer | hover:bg-red-600 hover:border-transparent | transition-colors duration-500" :class="{ 'hover:bg-green-400': positive, 'border-green-400': positive, 'hover:bg-red-600': !positive, 'border-red-600': !positive }"><div class="grid grid-rows-2 grid-flow-col gap-2 content-center"><div class="flex self-top row-span-1 text-xs italic">{{ name }}</div><div class="flex justify-center row-span-1 text-base">\${{ overallReturn.toLocaleString() }}</div><div class="flex justify-center self-center row-span-2 text-2xl items-end">+40.4%</div></div></div>`,
    methods:{
        getOverallReturn(){
            try {
                this.overallReturn = 5000;
                this.dayChange = 200;
                this.dayPercentChange = 3;
                this.positive = (this.dayChange >= 0) ? true : false;
            } catch(error){
                console.log(error);
                return 'error loading';
            }
        }
    },
    created(){
        this.getOverallReturn();
    }
})

App.mount('#App')


function getMarketPrice(apiStockSymbol){
    return new Promise(function(resolve, reject){
        let url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol="+apiStockSymbol+"&region=US";
        
        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "c4eac4392cmsh76076d1e061f713p1b7aa9jsn6f47c253ffd9",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            resolve(data);
        });
    })
}
var fileInput = document.getElementById("file-input"),

    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById('out').innerHTML = reader.result;
            console.log(reader.result)
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };

fileInput.addEventListener('change', readFile);
