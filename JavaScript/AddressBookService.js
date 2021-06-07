let isUpdate = false;
let addressbookObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            setTextValue(".text-error", "");
            return;
        }
        try {
            (new AddressBookData()).name = name.value;
            setTextValue(".text-error", "");
        } catch (e) {
            setTextValue(".text-error", e);
        }
    });

    checkForUpdate();
});


const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
 
    } catch (e) {
        return;
    }
}


const setAddressBookObject = () => {
    addressbookObj._name = getInputValueById("#name");
    addressbookObj._address = getInputValueById("#address");
    addressbookObj._city = getInputValueById("#city");
    addressbookObj._state = getInputValueById("#state");
    addressbookObj._zip = getInputValueById("#zip");
    addressbookObj._phno = getInputValueById("#phno");
};

const createAndUpdateStorage =()=> {
    let addressbookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressbookList) {
        let addressd = addressbookList.find(addressData => addressData._id == addressbookObj._id);
        if (!addressd) 
        {
            addressbookList.push(createAddressBookData());
        }
        else {
            const index = addressbookList.map(addressData => addressData._id).indexOf(addressbookList._id);
            addressbookList.splice(index, 1, createAddressBookData(addressd._id));
        }
    } else {
        addressbookList = [createAddressBookData()];
    }
    alert(addressbookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressbookList));
};

    const createAddressBookData = (id) =>{
        let addressbookdata = new  AddressBookData();
        if(!id) addressbookdata.id = createNewId();
        else addressbookdata.id = id;
        setAddressBookData(addressbookdata);
        return addressbookdata;
    } 


    const setAddressBookData = (addressbookdata) => {
        try {
           addressbookdata.name =addressbookObj._name;
        } catch (e) {
            setTextValue(".text-error", e);
            throw e;
        }
       addressbookdata.address =addressbookObj._address;
       addressbookdata.city =addressbookObj._city;
       addressbookdata.state =addressbookObj._state;
       addressbookdata.zip =addressbookObj._zip;
       addressbookdata.phno =addressbookObj._phno;
      alert(addressbookdata.toString());
    };
    
const createAddressBook = () => {
    let addressbookdata = new AddressBookData();
    try {
        addressbookdata.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    addressbookdata.address = getInputValueById('#address');
    addressbookdata.phno = getInputValueById("#phno")
    addressbookdata.zip = getInputValueById('#zip');
    addressbookdata.city = getInputValueById('#city') 
    addressbookdata.state = getInputValueById('#state') 

    alert(addressbookdata.toString());
    return addressbookdata;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

const setForm = () => {
    setValue("#name", addressbookObj._name);
    setValue("#address", addressbookObj._address);
    setValue("#city", addressbookObj._city);
    setValue("#state", addressbookObj._state);
    setValue("#zip", addressbookObj._zip);
    setValue("#phno", addressbookObj._phno);
};

const resetForm = () => {
    setDefaultValue('#name', '');
    setDefaultValue('#address', '');
    setDefaultValue('#zip', '');
    setDefaultValue('#city', 'Select City');
    setDefaultValue('#state', 'Select State');
    setDefaultValue('#phno', '');
}


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const setDefaultValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.value = value;
  };

  const checkForUpdate = () => {
    const addressbookJson = localStorage.getItem('editAddress');
    isUpdate = addressbookJson ? true : false;
    if(!isUpdate) return;
    addressbookObj = JSON.parse(addressbookJson);
    setForm();
}
const createNewId = () => {
    let addressId = localStorage.getItem("AddressBookID");
    addressId = !addressId ? 1 : (parseInt(addressId) + 1).toString();
    localStorage.setItem("AddressBookID", addressId);
    return addressId;
};
