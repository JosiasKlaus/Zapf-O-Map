class Station {
  constructor (stationData) {
    this.id = stationData.id;
    this.name = stationData.name;
    this.brand = stationData.brand;
    this.street = stationData.street;
    this.houseNumber = stationData.houseNumber; // Detail only
    this.postCode = stationData.postCode; // Detail only
    this.place = stationData.place;
    this.openingTimes = stationData.openingTimes; // Detail only
    this.overrides = stationData.overrides; // Detail only
    this.wholeDay = stationData.wholeDay; // Detail only
    this.isOpen = stationData.isOpen;
    this.e5 = stationData.e5;
    this.e10 = stationData.e10;
    this.diesel = stationData.diesel;
    this.lat = stationData.lat;
    this.lng = stationData.lng;
    this.dist = stationData.dist; // List only
    this.state = stationData.state; // Detail only
  }
}