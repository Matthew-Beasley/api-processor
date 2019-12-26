const BASE_URL = 'https://acme-users-api-rev.herokuapp.com';
const COMPANIES_ENDPOINT = '/api/companies';
const PRODUTS_ENDPOINT = '/api/products';
const OFFERINGS_ENDPOINT = '/api/offerings';

let range = {
    min: 3,
    max: 7
}

const findProcuctsInPriceRange = (productData, obj) => {
    const inRange = productData.reduce((acc, item) => {
        if (item.suggestedPrice >= obj.min && item.suggestedPrice <= obj.max){
            acc.push(item);
        }
        return acc;
    }, [])
    return inRange;
}

const groupCompaniesByLetter = (companyData) => {
    const obj = {};
    companyData.forEach(item => {
        let letter = item.name.substr(0, 1);
        if (!obj.hasOwnProperty(letter)) {
           obj[letter] = [];
           obj[letter].push(item);
        } else {
            obj[letter].push(item);
        }
    })
    return obj;
}

const groupCompaniesByState = (companyData) => {
    const obj = {};
    companyData.forEach(item => {
        if (!obj.hasOwnProperty(item.state)) {
            obj[item.state] = [];
            obj[item.state].push(item);
        } else {
            obj[item.state].push(item);
        }
    })
    return obj;
}

const getOfferingData = (offer, product, company) => {

    offer.forEach(offering =>
        {
            product.forEach(prod => {
                if (prod.id === offering.productId) {
                    offering.product = prod;
                }
            })
            company.forEach(comp => {
                if (comp.id === offering.companyId) {
                    offering.company = comp;
                }
            })
        })
        return offer;
}

const fetchData = (endPoint) => new Promise((res, rej) => {
    return fetch(`${BASE_URL}${endPoint}`)
            .then(response => response.json())
            .then(jsonData => res(jsonData))
            .catch(err => rej(err))
        });


Promise.all([fetchData(COMPANIES_ENDPOINT), fetchData(PRODUTS_ENDPOINT), fetchData(OFFERINGS_ENDPOINT)])
    .then(([companies, products, offerings]) => {

        //console.log(findProcuctsInPriceRange(products, range));
        //console.log(groupCompaniesByLetter(companies));
        //console.log(groupCompaniesByState(companies));
        console.log(getOfferingData(offerings, products, companies));

    });


// returns and array of the offerings with eah offering having a company and product

// returns the companies that have n or more offerings

//returns an array of products where each product has the average proce of its offerings
