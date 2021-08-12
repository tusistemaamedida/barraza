import moment from "moment";

export default class {
  constructor({
    _id,
    deposit,
    CobBarraCaja_Int,
    nombre,
    ID_Articulo,
    CobBarraArt_Int,
    scan_preparation,
    pallet_dispatch,
  }) {
    this._id = _id;
    this.nombre = nombre;
    this.ID_Articulo = ID_Articulo;
    this.CobBarraArt_Int = CobBarraArt_Int;
    this.street = deposit?.street ? deposit.street : "0";
    this.column = deposit?.column ? deposit.column : "0";
    this.position = deposit?.position ? deposit.position : "0";
    this.CobBarraCaja_Int = CobBarraCaja_Int ? CobBarraCaja_Int : "-";
    this.pallet = deposit?.code ? deposit.code : this._id;
    this.scan_preparation = scan_preparation ? scan_preparation : false;
    this.pallet_dispatch = pallet_dispatch ? pallet_dispatch : null;
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
