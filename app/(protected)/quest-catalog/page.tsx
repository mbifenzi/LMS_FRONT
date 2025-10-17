import QuestCatalog from '@/components/quest-catalog/QuestContent';

import { fetchCurrentUser } from '@/lib/api/user-api';

export default async function QuestCatalogPage() {
  const currentUser = await fetchCurrentUser();
  const role = currentUser?.role;
  return <QuestCatalog role={role} />;
}
