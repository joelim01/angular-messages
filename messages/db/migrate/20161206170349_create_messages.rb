class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.datetime :sent_on
      t.text :content, null: false
      t.boolean :private, null: false, default: true
      t.boolean :send_as_group, null: false, default: true

      t.timestamps
    end
  end
end
