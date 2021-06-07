let addressbookList;
window.addEventListener("DOMContentLoaded", (event) => {
    addressbookList =getAddressBookDataFromStorage();
    createInnerHtml();
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

    const createInnerHtml = () => 
    {
        if(addressbookList.length==0)
        return; 
        const headerhtml = " <th>Name </th>   <th>Address</th> <th>City</th>   <th>State</th>  <th>Zip</th> <th>PhoneNo</th>   <th>Actions</th>  ";
        let innerHtml = `${headerhtml}`; 
        for(const addressbookData of addressbookList) {
        innerHtml = `${innerHtml}

             <tr>
            <td>${addressbookData._name}</td>
            <td>${addressbookData._address}</td>
            <td>${addressbookData._city}</td>
            <td>${addressbookData._state}</td>
            <td>${addressbookData._zip}</td>
            <td>${addressbookData._phno}</td>
            <td>
            
            <img id="${addressbookData._id}" onclick ="remove(this)" 
             src="../Assets/icons/delete-black-18dp.svg"  alt="delete" >
            <img id="${addressbookData._id}"  src="../Assets/icons/create-black-18dp.svg"  alt="edit" onclick="update(this)">
        </td>
            </tr>  
        `;   
        }    
        
        document.querySelector('#table').innerHTML= innerHtml;

    }
    
    const remove = (node) => {
        let addressbookData = addressbookList.find(addressData => addressData._id == node.id);
        if (!addressbookData) return;
        const index = addressbookList.map(addressData => addressData._id).indexOf(addressbookData._id);
        addressbookList.splice(index, 1);
        localStorage.setItem("AddressBookList", JSON.stringify(addressbookList));
        createInnerHtml();
    }

    const update = (node)=>{
        let  addressbookData = addressbookList.find(addressData => addressData._id == node.id)
        if(!addressbookData) return;
        localStorage.setItem('editAddress',JSON.stringify(addressbookData))
        window.location.replace(site_properties.add_address_book_page);
    }
    

