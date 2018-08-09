class Block{
	constructor(index,previousHash,timestamp,data,hash){
		this.index=index;
		this.previousHash=previousHash.toString();
		this.timestamp=timestamp;
		this.data=data;
		this.hash=hash.toString();
	}
}

var calculateHash=(index,previousHash,timestamp,data)=>{
	return CryptoJS.SHA256(index+previousHash+timestamp+data).toString();
}


var generateNextBlock=(blockData)=>{
	var previousBlock=getLatestBlock();
	var nextIndex=previousBlock.index+1;
	var nextTimestamp=new Date().getTime()/1000;
	var nextHash=calculateHash(nextIndex,previousBlock.hash,nextTimestamp,blockData);
	return new Block(nextIndex,previousBlock.hash,nextTimestamp,blockData,nextHash);
}

var getGenesisBlock=()=>{
	return new Block(0,'0',111,'genesis','aaaaa')
}

var blockchain=[getGenesisBlock()];


var isValidNewBlock=(newBlock,previousBlock)=>{
	if(previousBlock.index+1!==newBlock.index){
	  return false;
	}else if(previousBlock.hash!==newBlock.previousHash){
		return false;
	}else if(calculateHashForBlock(newBlock)!==newBlock.hash){
		return false;
	}
	return true;
	
}


var replaceChain=(newBlock)=>{
	if(isValidChain(newBlocks) && newBlocks.length>blockchain.length){
		blockchain=newBlocks;
		broadcast(responseLatestMsg());
	}else{
		console.log('invalid')
	}
}


var initHttpServer=()=>{
	var app=express();
	app.use(bodyParser.json());

	app.get('/blocks',(req,res)=>res.send(JSON.stringify(blockchain)));
	app.post('/mineBlock',(req,res)=>{
		var newBlock=generateNextBlock(req.body.data);
		addBlock(newBlock);
		broadcast(responseLatestMsg());
		res.send();
	});
	app.get('/peers',(req,res)=>{
		res.send(sockets.map(s=>s._socket.remoteAddress+':'+s._socket.remotePort));
	});
	app.post('/addPeer',(req,res)=>{
		connectToPeers([req.body.peer]);
		res.send();
	});
	app.listen(http_port,()=>console.log('listening: '+http_port))
}