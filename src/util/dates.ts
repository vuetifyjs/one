export function isWithinRange (item: any) {
  const adapter = useDate()
  const today = adapter.startOfDay(adapter.date())

  const start = adapter.startOfDay(adapter.date(item.metadata.start_date))
  const end = adapter.endOfDay(adapter.date(item.metadata.end_date))

  return adapter.isWithinRange(today, [start, end])
}
