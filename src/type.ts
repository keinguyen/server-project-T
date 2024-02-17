type AttachmentFile = {
  fileId: string;
  ticketId: string;
  imageView: string;
};

enum TicketStatus {
  WAITING = "WAITING",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
}

export type Ticket = {
  id?: string;
  createBy: string;
  title: string;
  desc: string;
  price: number;
  channelId: string;
  patientInfo: {
    fisrtName: string;
    lastName: string;
    phoneNumber: string;
  };
  status: TicketStatus;
  attachmentFiles?: AttachmentFile[];
};
