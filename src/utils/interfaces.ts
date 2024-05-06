export interface Borrower {
  id: number;
  name: string;
  itemDescription: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  selectedBorrower: Borrower | null;
}

export interface BorrowerListProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
