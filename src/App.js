import React from "react";
import DataTable from "react-data-table-component";
import { data } from "./Data";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import { Export } from "./Export";
import "./styles.css";

const customStyles = {
  header: {
    style: {
      minHeight: "56px"
    }
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: "#E3EBEB"
    }
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#E3EBEB"
      }
    }
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#E3EBEB"
      }
    }
  }
};

const columns = [
  {
    name: <strong>Date</strong>,
    selector: "date",
    maxWidth: "200px",
    wrap: true,
    sortable: true
  },
  {
    name: <strong>LastName</strong>,
    selector: "lastName",
    maxWidth: "120px",
    wrap: true,
    sortable: true
  },
  {
    name: <strong>City</strong>,
    selector: "city",
    maxWidth: "150px",
    wrap: true,
    sortable: true
  },
  {
    name: <strong>Remarks</strong>,
    selector: "companyName",
    maxWidth: "450px",
    wrap: true,
    sortable: true
  },
  {
    name: <strong>State</strong>,
    selector: "state",
    maxWidth: "150px",
    wrap: true,
    sortable: true
  },
  {
    name: <strong>ActualDuration</strong>,
    selector: "actualDuration",
    maxWidth: "150px",
    wrap: true,
    sortable: true
  },
  {
    name: <strong>ZipCode</strong>,
    selector: "zipCode",
    maxWidth: "150px",
    wrap: true,
    sortable: true
  }
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      variant="outlined"
      autoComplete="off"
      margin="dense"
      placeholder="search"
      aria-label="Search Input"
      size="medium"
      value={filterText}
      onChange={onFilter}
      InputProps={{
        endAdornment: filterText.length > 0 && (
          <InputAdornment position="end">
            <IconButton onClick={onClear} edge="end">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      style={{ width: "25%" }}
    />
  </>
);

export default function App() {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = data?.filter(
    (item) =>
      item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.city.toLowerCase().includes(filterText.toLowerCase()) ||
      item.companyName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.state.toLowerCase().includes(filterText.toLowerCase()) ||
      item.zipCode.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const actionsMemo = React.useMemo(
    () => <Export data={{ filteredItems, columns }} />,
    []
  );

  return (
    <div className="App">
      <DataTable
        pagination
        customStyles={customStyles}
        striped
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        highlightOnHover
        title="Remark Test"
        columns={columns}
        data={filteredItems}
        actions={actionsMemo}
      />
    </div>
  );
}
