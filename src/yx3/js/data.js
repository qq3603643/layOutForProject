define([],()=>{

	let data,host=window.location.host;

	if(host.includes('info')){
		data=[
			{
	            "title": "惠好26元优惠券",
                "salerId": 36055,
                "goods": [
                    { "id": 273686, "num": 20 },
                    { "id": 276004, "num": 10 }
                ]
            },
            {
	            "title": "惠好34元优惠券",
                "salerId": 36055,
                "goods": [
                   { "id": 271220, "num": 20 },
	               { "id": 596990, "num": 10 }
                ]
            },
            {
	            "title": "惠好7元优惠券",
                "salerId": 36055,
                "goods": [
                    { "id": 273249, "num": 20 },
                    { "id": 528529, "num": 10 }
                ]
            },
            {
	            "title": "惠好34元优惠券1",
                "salerId": 36055,
                "goods": [
                    { "id": 271220, "num": 20 },
                    { "id": 528529, "num": 10 }
                ]
            },
            {
	            "title": "惠好26元优惠券1",
                "salerId": 36055,
                "goods": [
                    { "id": 273686, "num": 20 },
                    { "id": 596990, "num": 10 }
                ]
            },
            {
	            "title": "惠好7元优惠券1",
                "salerId": 36055,
                "goods": [
                    { "id": 273249, "num": 20 },
                    { "id": 276004, "num": 10 }
                ]
            },
            // {
	           //  "title": "全祥药品包320",
            //     "salerId": 36055,
            //     "goods": [
            //         { "id": 273686, "num": 10 },
            //         { "id": 596990, "num": 20 }
            //     ]
            // },
            // {
	           //  "title": "全祥药品包190",
            //     "salerId": 36055,
            //     "goods": [
            //         { "id": 273686, "num": 10 },
            //         { "id": 276004, "num": 50 }
            //     ]
            // },
            // {
	           //  "title": "全祥药品包430",
            //     "salerId": 36055,
            //     "goods": [
            //         { "id": 273686, "num": 10 },
            //         { "id": 276563, "num": 100 }
            //     ]
            // },
            // {
	           //  "title": "全祥药品包586",
            //     "salerId": 36055,
            //     "goods": [
            //          { "id": 273686, "num": 10 },
            //          { "id": 596984, "num": 200 }
            //     ]
            // }
		];
	}else{
		data=[
			{
                "title": "惠好26元优惠券",
                "salerId": 19325,
                "goods": [
                    { "id": 101069, "num": 20 },
                    { "id": 775022, "num": 10 }
                ]
            },
            {
                "title": "惠好34元优惠券",
                "salerId": 19325,
                "goods": [
                    { "id": 124910, "num": 20 },
                    { "id": 775009, "num": 10 }
                ]
            },
            {
                "title": "惠好7元优惠券",
                "salerId": 19325,
                "goods": [
                    { "id": 133726, "num": 20 },
                    { "id": 688120, "num": 10 }
                ]
            },
            {
                "title": "惠好34元优惠券1",
                "salerId": 19325,
                "goods": [
                    { "id": 124910, "num": 20 },
                    { "id": 688120, "num": 10 }
                ]
            },
            {
                "title": "惠好26元优惠券1",
                "salerId": 19325,
                "goods": [
                    { "id": 101069, "num": 20 },
                    { "id": 775009, "num": 10 }
                ]
            },
            {
                "title": "惠好7元优惠券1",
                "salerId": 19325,
                "goods": [
                    { "id": 133726, "num": 20 },
                    { "id": 775022, "num": 10 }
                ]
            }
		];
	}
	return {
		data:data
	};
});