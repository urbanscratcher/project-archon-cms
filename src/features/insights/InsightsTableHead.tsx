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
          className={def.style}
        >
          {def?.sortKey ? (
            <SortableColumnBtn
              def={def}
              sorts={sorts}
              onAddSorts={addSorts}
              onRemoveSorts={removeSorts}
            />
          ) : (
            <p className="pl-2">{def.head}</p>
          )}
        </Table.HeadCell>
      ))}
    </>
  );
}

export default InsightsTableHead;
