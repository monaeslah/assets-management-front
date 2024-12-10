interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const SectionTable = <T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  return (
    <section className="mainTable" id="thetender">
      <section className="rowHeading">
        {columns.map((col) => (
          <div key={col.accessor as string} className="tableCell">
            <span className="itemlabel">{col.header}</span>
          </div>
        ))}
        {(onEdit || onDelete) && (
          <div className="tableCell">
            <span className="itemlabel">Actions</span>
          </div>
        )}
      </section>

      <section className="tableContainer">
        {data.length > 0 ? (
          data.map((item) => (
            <section key={item.id} className="tableRow">
              {columns.map((col) => (
                <div key={col.accessor as string} className="tableCell">
                  {item[col.accessor]}
                </div>
              ))}
              {(onEdit || onDelete) && (
                <div className="tableCell align-right">
                  {onEdit && (
                    <button className="button" onClick={() => onEdit(item.id)}>
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="button"
                      onClick={() => {
                        console.log("Clicked delete for item ID:", item.id);
                        onDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </section>
          ))
        ) : (
          <section className="tableRow">
            <div
              className="tableCell"
              style={{ gridColumn: columns.length + 1 }}
            >
              No data available
            </div>
          </section>
        )}
      </section>
    </section>
  );
};

export default SectionTable;
