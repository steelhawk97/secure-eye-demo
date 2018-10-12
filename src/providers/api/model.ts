export  class  Basic {
	success: boolean;
	message: string;
    item: {};
    
	constructor(values: Object = {}) {
    	Object.assign(this, values);
	}
}