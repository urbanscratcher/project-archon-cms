import SortableColumnBtn from '../../ui/button/SortableColumnBtn';
import Table from '../../ui/table/Table';
import { insightColumnDefs } from './insightColumnDefs';
import { useInsightsFilterStore } from './insightsStore';

function InsightsTableHead() {
  const { sorts, addSorts, removeSorts } = useInsightsFilterStore();

  return (
    <>
      {insightColumnDefs.map((def) => (
        <Table.HeadCell
          key={def.head}
          style={def.style}
        >
          {def?.sortKey ? (
            <SortableColumnBtn
              def={def}
              sorts={sorts}
              onAddSorts={addSorts}
              onRemoveSorts={removeSorts}
            />
          ) : (
            def.head
          )}
        </Table.HeadCell>
      ))}
    </>
  );
}

export default InsightsTableHead;
