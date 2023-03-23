import { axios_instance } from "../../config"
import { removeMany } from "../../utils/crudUtils"

import { useMutation, useQueryClient } from "react-query"
import { getItem } from "../../utils/localStorage"

const deleteInvoices = async (InvoiceIds: string[]): Promise<string[]> => {
  const { data } = await axios_instance.delete("/invoice", {
    data: {
      ids: InvoiceIds,
    },
    headers: {
      Authorization: `Bearer ${getItem(`authkey`)}`,
    },
  })
  return data
}

export function useDeleteInvoices() {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync } = useMutation(deleteInvoices, {
    onSuccess: (InvoiceIds: string[]) => {
      queryClient.setQueryData<any[]>(["invoices"], (oldInvoices) =>
        removeMany(oldInvoices, InvoiceIds)
      )
    },
  })

  return { isDeleting: isLoading, deleteInvoices: mutateAsync }
}
