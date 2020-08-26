"use strict"

const seasons = ['spring', 'summer', 'autumn', 'winter'];

for(let [i, v] of seasons.entries()){
    if(v.length < 2){
        seasons[i] = '';
    }else{
        seasons[i] = v.substring(0, 2) + v.substring(v.length - 2, v.length);
    };
}

console.log(seasons);