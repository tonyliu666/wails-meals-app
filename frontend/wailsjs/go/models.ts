export namespace main {
	
	export class Meal {
	    food_name: string;
	    where_eaten: string;
	    date_eaten: string;
	    time_eaten: string;
	    periods: string;
	    time_slots: string;
	    // Go type: struct { Carolie float64 "json:\"carolie\""; Protein float64 "json:\"protein\""; Fat float64 "json:\"fat\""; Carbonhydrate float64 "json:\"carbonhydrate\"" }
	    Ingredients: any;
	
	    static createFrom(source: any = {}) {
	        return new Meal(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.food_name = source["food_name"];
	        this.where_eaten = source["where_eaten"];
	        this.date_eaten = source["date_eaten"];
	        this.time_eaten = source["time_eaten"];
	        this.periods = source["periods"];
	        this.time_slots = source["time_slots"];
	        this.Ingredients = this.convertValues(source["Ingredients"], Object);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Place {
	    name: string;
	    // Go type: struct { Lat float64 "json:\"lat\""; Lng float64 "json:\"lng\"" }
	    location: any;
	    rating: number;
	
	    static createFrom(source: any = {}) {
	        return new Place(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.location = this.convertValues(source["location"], Object);
	        this.rating = source["rating"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

