interface TableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
    render?: (value: any) => JSX.Element;
  }[];
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
      {/* Table Header */}
      <section className="rowHeading">
        {columns.map((col, index) => (
          <div key={index} className="tableCell tableHeader subtitle1 ">
            <span>{col.header}</span>
          </div>
        ))}
        {(onEdit || onDelete) && (
          <div className="tableCell tableHeader actionsHeader">
            <span>Actions</span>
          </div>
        )}
      </section>

      {/* Table Body */}
      <section className="tableContainer caption">
        {data.length > 0 ? (
          data.map((item) => (
            <section key={item.id} className="tableRow">
              {columns.map((col, index) => (
                <div key={index} className="tableCell">
                  {col.render
                    ? col.render(item[col.accessor])
                    : item[col.accessor]}
                </div>
              ))}
              {(onEdit || onDelete) && (
                <div className="tableCell actionsCell">
                  {onEdit && (
                    <button
                      className="iconButton"
                      onClick={() => onEdit(item.id)}
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="iconButton deleteButton"
                      onClick={() => onDelete(item.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              )}
            </section>
          ))
        ) : (
          <section className="tableRow noDataRow">
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
