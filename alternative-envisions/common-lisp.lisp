(defun default-options (default-options options)
  (assign default-options (arg-options)))


(defun options ()
  (default-options (width 600 backdrop T close-button T)))


(defun popup (content)
  (create-popup (content))
  (create-backdrop))

(defun create-popup (content)
  (create-element 
    (html "<div class=popup>" content "</div>")
    (width (px (popup-width))
     margin-left (px (minus (half (popup-width))))
     padding (options padding))))