function bs(arr){
	var s=0,e=arr.length;
	if(arr[s]==null)
		return s;
	if(arr[e]!=null)
		return -1;
	while(s<e){
		var m = Math.floor((s+e)/2);
		//console.log("s: "+s+" e: "+e+" m: "+m);
		if(e-s == 1){
			if(arr[s]==null)
				return s;
			else
				return e;
		}else if(arr[m]!=null){
			s = m+1;
		}else if(arr[m]==null){
			e = m;
		}
		
	}
	return s;
}

console.log(bs([1,1,1,1,null,null]));