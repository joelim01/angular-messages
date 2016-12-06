class CreateMessageSenders < ActiveRecord::Migration[5.0]
  def change
    create_table :message_senders do |t|
      t.integer :message_id
      t.integer :sender_id

      t.timestamps
    end
  end
end
