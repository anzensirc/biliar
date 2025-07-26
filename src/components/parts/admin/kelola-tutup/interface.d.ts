export interface TutupResponse {
  id: number
  date: string
  type: string
  reason: string
  referenceId?: number
  createdAt: string
  reference?: Reference
  openedBy: OpenedBy[]
}

export interface Reference {
  id: number
  date: string
  type: string
  reason: string
  referenceId: any
  createdAt: string
}

export interface OpenedBy {
  id: number
  date: string
  type: string
  reason: string
  referenceId: number
  createdAt: string
}
