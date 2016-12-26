class CreateMessageRecipients < ActiveRecord::Migration[5.0]
  def change
    create_table :message_recipients do |t|
      t.integer :message_id
      t.integer :recipient_id
      t.datetime :received_on

      t.timestamps
    end
  end
end
