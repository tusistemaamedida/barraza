import moment from "moment";

export default class {
  constructor({ _id, created_at, orders, number, status }) {
    this._id = _id;
    this.number = number;
    this.orders = orders;
    this.status = status;
    this.createdAt = moment(created_at).format("DD/MM/YY - HH:mm");
  }

  get handleStatus() {
    switch (this.status) {
      case "PENDING":
        return {
          background: "yellow",
          textColor: "white",
          label: "ABIERTO",
        };

      case "CLOSED":
        return {
          background: "blue",
          textColor: "white",
          label: "PREPARADO",
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
