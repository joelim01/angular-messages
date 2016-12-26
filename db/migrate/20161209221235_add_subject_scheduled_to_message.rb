class AddSubjectScheduledToMessage < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :subject, :string
    add_column :messages, :scheduled_send_date, :datetime
  end
end
