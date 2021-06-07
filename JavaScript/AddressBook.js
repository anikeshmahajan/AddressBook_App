class AddressBookData
{
get id()
{
    return this._id ;
}

set id (id)
{
    this._id= id;
}

get name(){
 return this._name ;
}
set name(name)
{
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(nameRegex.test(name))
    this._name= name;
    else
    throw "Name incorrect";
}


get address()
{
    return this._address ;
}

set address(address)
{
    this._address ;
}

get state()
{
    return this._state ;
}

set state(state)
{
    this._state = state;
}

get city()
{
    return this._city ;
}

set city(city)
{
    this._city= city;
}

get zip()
{
    return this._zip ;

}

set zip(zip)
{
    this._zip = zip;
}

get phno()
{
    return this._phno;
}

set phno(phno)
{
      this._phno = phno;
  
}


    toString() {
        return ' Name : ' + this._name + ' Address : ' + this._address + ' City : ' + this._city + ' State : ' + this._state + ' Zip : ' + this._zip +
            ' Phone Number : ' + this._phno ;
    }

}