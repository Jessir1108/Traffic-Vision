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
    const { data, columns } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column}>
                      {row[column.toLowerCase().replace(/ /g, "")]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {data.length > rowsPerPage && (
          <div className="pagination">
            <button
              onClick={() => this.handleChangePage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              onClick={() => this.handleChangePage(page + 1)}
              disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
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
