const SHA256=require('./sha256.js');




function generateNewBlock(Transactions, previousHash){
    let timestamp=Date.now();
    let currentHash= SHA256(timestamp + JSON.stringify(Transactions) + previousHash ).toString();//初始hash值
    
    let difficulty=2;
    //随机扰动值                
    for(var factor = 0; currentHash.substring(0, difficulty) !== Array(difficulty + 1).join("0"); factor++) {//使得hash满足条件
        currentHash = SHA256(timestamp + JSON.stringify(Transactions) + previousHash + factor).toString();
    }    	

    return {
    	timestamp,
    	Transactions,
    	previousHash,
    	currentHash,
        factor
    }   	 
}






let sunChain = [];



let firtBlock=generateNewBlock([], "0");//第一个block
sunChain.push(firtBlock);


let newBlock=generateNewBlock([{fromAddress:'address1',toAddress:'address2',amount:100},{fromAddress:'address1',toAddress:'address3',amount:500}], sunChain[sunChain.length-1].currentHash);	
sunChain.push(newBlock);


console.log(sunChain);//展示当前blockchain



// https://github.com/lhartikk/naivechain
// https://github.com/lhartikk/naivechain

// https://lhartikk.github.io/jekyll/update/2017/07/14/chapter1.html
// https://github.com/conradoqg/naivecoin


// https://blockchain.nambrot.com/
// https://github.com/nambrot/blockchain-in-js


// https://blockchaindemo.io/
// https://github.com/seanjameshan/blockchain


// https://github.com/SavjeeTutorials/SavjeeCoin


// https://github.com/rddill-IBM/ZeroToBlockchain

// https://github.com/keppel/lotion






function calculateBalanceOfAddress(address){
    let balance = 100000;//每个人初始余额100000
    for(let block of sunChain){//遍历整个blockchain，找到每个block
        for(let trans of block.Transactions){//遍历block中记录的交易，计算当前账户的余额
            if(trans.fromAddress === address){
                balance -= trans.amount;
            }

            if(trans.toAddress === address){
                balance += trans.amount;
            }
        }
    }

    console.log(balance);//返回当前账户的余额
}

calculateBalanceOfAddress('address3');



// https://hackernoon.com/learn-blockchains-by-building-one-117428612f46
// https://github.com/dvf/blockchain


// https://github.com/cosme12/SimpleCoin


