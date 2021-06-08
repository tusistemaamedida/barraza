import moment from "moment";

export default class {
  constructor({
    _id,
    client,
    created_at,
    cuit,
    number,
    products,
    status,
    updated_at,
  }) {
    this._id = _id;
    this.number = number;
    this.client = client;
    this.cuit = cuit;
    this.products = products;
    this.status = status;
    this.updated_at = moment(updated_at).format("DD/MM/YY - HH:mm");
    this.created_at = moment(created_at).format("DD/MM/YY - HH:mm");
  }

  get handleStatus() {
    switch (this.status) {
      case "SOLICITADO":
        return {
          background: "yellow",
          textColor: "white",
          label: "SOLICITADO",
        };

      case "EN PREPARACION":
        return {
          background: "blue",
          textColor: "white",
          label: "EN PREPARACIÓN",
        };

      default:
        return {
          background: "red",
          textColor: "white",
          label: "ERROR",
        };
    }
  }
}
