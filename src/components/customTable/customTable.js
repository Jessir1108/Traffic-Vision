import React from "react";
import "./customTable.css";

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleChangePage = (newPage) => {
    this.setState({ page: newPage });
  };

  render() {
    const { detections } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Plate</th>
              <th># of Infractions</th>
            </tr>
          </thead>
          <tbody>
            {detections
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((detection) => (
                <tr key={detection.plate}>
                  <td>{detection.plate}</td>
                  <td>{detection.infractions}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {detections.length > rowsPerPage && (
          <div className="pagination">
            <button
              onClick={() => this.handleChangePage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              onClick={() => this.handleChangePage(page + 1)}
              disabled={page >= Math.ceil(detections.length / rowsPerPage) - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default CustomTable;
