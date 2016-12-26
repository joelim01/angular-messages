class MessageRecipientsController < ActionController::Base

  def destroy
    MessageRecipient.find(params[:id]).delete
  end

end
