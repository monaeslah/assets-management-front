interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const Table = <T extends { id: number }>({
  data,
  columns,
  onEdit,
  onDelete,
}: TableProps<T>) => (
  <table>
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.accessor as string}>{col.header}</th>
        ))}
        {(onEdit || onDelete) && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((col) => (
            <td key={col.accessor as string}>{item[col.accessor]}</td>
          ))}
          {(onEdit || onDelete) && (
            <td>
              {onEdit && <button onClick={() => onEdit(item.id)}>Edit</button>}
              {onDelete && (
                <button onClick={() => onDelete(item.id)}>Delete</button>
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
